export function parseTextIntoFields(ocrText) {
  const lines = ocrText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const full = lines.join('\n');

  // 1) Determine expense vs income
  let isExpense = null;
  if (/^From\s+/mi.test(full) || /^Received from/m.test(full)) {
    isExpense = false;
  } else if (/^To\s+/mi.test(full) || /^Paid to/m.test(full)) {
    isExpense = true;
  }

  // 2) Name (use line 1 as fallback if regex fails)
  const nameRegex = isExpense
    ? /^(?:To|Paid to)\s+(.+)$/mi
    : /^(?:From|Received from)\s+(.+)$/mi;

  const nameMatch = full.match(nameRegex);
  const partyName = nameMatch
    ? nameMatch[1].trim()
    : lines[0]?.replace(/^To\s+/, '') || '';

  // 3) Amount - Enhanced to handle rupee symbol misrecognition
  let amount = 0;
  let transactionIdIndex = -1;
  
  // Find the transaction ID line index
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('transaction id')) {
      transactionIdIndex = i;
      break;
    }
  }

  // Enhanced amount detection with rupee symbol correction
  for (let i = 0; i < (transactionIdIndex === -1 ? lines.length : transactionIdIndex); i++) {
    const line = lines[i];
    
    // Skip lines that look like dates
    if (/\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(line)) {
      continue;
    }
    
    // Skip lines with "Completed" status
    if (line.toLowerCase().includes('completed')) {
      continue;
    }

    // Skip phone numbers (containing +91 or similar patterns)
    if (/\+91|@/.test(line)) {
      continue;
    }

    // Pattern 1: Check for misrecognized rupee symbol patterns
    // "21.00" where 2 is likely a misrecognized ₹ and the actual amount is 1.00
    const rupeePatterns = [
      // Pattern: "2X.XX" where X.XX is a small amount (likely ₹X.XX)
      /^2([0-9]\.[0-9]{2})$/,
      // Pattern: "2X,XXX" where it's likely ₹X,XXX  
      /^2([0-9](?:,[0-9]{3})*(?:\.[0-9]{2})?)$/,
      // Pattern: "2X" where X is 1-3 digits (likely ₹X)
      /^2([0-9]{1,3})$/
    ];

    for (const pattern of rupeePatterns) {
      const match = line.match(pattern);
      if (match) {
        const correctedAmount = parseFloat(match[1].replace(/,/g, ''));
        console.log(`🔧 Corrected misrecognized rupee: "${line}" → ₹${correctedAmount}`);
        amount = correctedAmount;
        break;
      }
    }

    if (amount > 0) break;

    // Pattern 2: Normal standalone amounts
    const standaloneAmountMatch = line.match(/^₹?\s*([\d,]+(?:\.\d{1,2})?)$/);
    if (standaloneAmountMatch) {
      const potentialAmount = parseFloat(standaloneAmountMatch[1].replace(/,/g, ''));
      // Skip very large numbers that might be phone numbers or IDs
      if (potentialAmount < 1000000 && potentialAmount > 0) {
        amount = potentialAmount;
        break;
      }
    }
  }

  // If no standalone amount found, look for amount in parentheses before transaction ID
  if (!amount) {
    for (let i = 0; i < (transactionIdIndex === -1 ? lines.length : transactionIdIndex); i++) {
      const line = lines[i];
      
      // Skip lines that look like dates
      if (/\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(line)) {
        continue;
      }
      
      const parenthesesAmountMatch = line.match(/\((\d+(?:\.\d{1,2})?)\)/);
      if (parenthesesAmountMatch) {
        const potentialAmount = parseFloat(parenthesesAmountMatch[1]);
        // Only take small numbers in parentheses as amounts
        if (potentialAmount < 10000 && potentialAmount > 0) {
          amount = potentialAmount;
          break;
        }
      }
    }
  }

  // If still no amount found, look for any amount before transaction ID (but skip dates)
  if (!amount) {
    for (let i = 0; i < (transactionIdIndex === -1 ? lines.length : transactionIdIndex); i++) {
      const line = lines[i];
      
      // Skip lines that look like dates
      if (/\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(line)) {
        continue;
      }
      
      // Skip lines with "Completed" status
      if (line.toLowerCase().includes('completed')) {
        continue;
      }

      // Skip phone numbers
      if (/\+91|@/.test(line)) {
        continue;
      }
      
      const amountMatch = line.match(/₹?\s*([\d,]+(?:\.\d{1,2})?)/);
      if (amountMatch) {
        const potentialAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
        // Skip very large numbers that might be phone numbers or IDs
        if (potentialAmount < 1000000 && potentialAmount > 0) {
          amount = potentialAmount;
          break;
        }
      }
    }
  }

  // 4) Date & Time - Enhanced regex and add one day
  const dtMatch = full.match(
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\w*\s+\d{4}),?\s*(\d{1,2}:\d{2}\s*(?:am|pm))/i
  );

  let date = '';
  let time = '';
  
  if (dtMatch) {
    const originalDate = dtMatch[1];
    time = dtMatch[2].toLowerCase();
    
    // Parse the date and add one day
    const dateParts = originalDate.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
    if (dateParts) {
      const day = parseInt(dateParts[1]);
      const month = dateParts[2];
      const year = parseInt(dateParts[3]);
      
      // Create date object
      const monthMap = {
        'jan': 0, 'january': 0,
        'feb': 1, 'february': 1,
        'mar': 2, 'march': 2,
        'apr': 3, 'april': 3,
        'may': 4, 'may': 4,
        'jun': 5, 'june': 5,
        'jul': 6, 'july': 6,
        'aug': 7, 'august': 7,
        'sep': 8, 'september': 8,
        'oct': 9, 'october': 9,
        'nov': 10, 'november': 10,
        'dec': 11, 'december': 11
      };
      
      const monthIndex = monthMap[month.toLowerCase().substring(0, 3)];
      if (monthIndex !== undefined) {
        const dateObj = new Date(year, monthIndex, day);
        // Add one day
        dateObj.setDate(dateObj.getDate() + 1);
        
        // Format back to original format
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        date = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
      } else {
        date = originalDate; // fallback to original if parsing fails
      }
    } else {
      date = originalDate; // fallback to original if parsing fails
    }
  }

  return {
    isExpense,
    partyName,
    amount,
    date,
    time,
    count: 1
  };
}