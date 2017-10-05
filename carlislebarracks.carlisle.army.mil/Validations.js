// JavaScript Document

	function checkValidDate(dateStr) {
    
		// dateStr must be of format month day year with either slashes
	    // or dashes separating the parts. Some minor changes would have
	    // to be made to use day month year or another format.
    	// This function returns True if the date is valid.
    	var slash1 = dateStr.indexOf("/");
		if (slash1 == -1) 
		{ 
			slash1 = dateStr.indexOf("-"); 
		}

	    // if no slashes or dashes, invalid date
    	if (slash1 == -1) 
		{ 
			return false; 
		}

	    var dateMonth = dateStr.substring(0, slash1);
    	var dateMonthAndYear = dateStr.substring(slash1+1, dateStr.length);
	    var slash2 = dateMonthAndYear.indexOf("/");
		
    	if (slash2 == -1) 
		{ 
			slash2 = dateMonthAndYear.indexOf("-"); 
		}

	    // if not a second slash or dash, invalid date
    	if (slash2 == -1) 
		{ 
			return false; 
		}

	    var dateDay = dateMonthAndYear.substring(0, slash2);
    	var dateYear = dateMonthAndYear.substring(slash2+1, dateMonthAndYear.length);
	    if ( (dateMonth == "") || (dateDay == "") || (dateYear == "") ) 
		{ 
			return false; 
		}

	    // if any non-digits in the month, invalid date
    	for (var x=0; x < dateMonth.length; x++) 
		{
        	var digit = dateMonth.substring(x, x+1);
        	if ((digit < "0") || (digit > "9")) 
			{ 
				return false; 
			}
    	}

	    // convert the text month to a number
    	var numMonth = 0;
    	for (var x=0; x < dateMonth.length; x++) 
		{
        	digit = dateMonth.substring(x, x+1);
        	numMonth *= 10;
        	numMonth += parseInt(digit);
    	}

	    if ((numMonth <= 0) || (numMonth > 12)) 
		{ 
			return false; 
		}

	    // if any non-digits in the day, invalid date
    	for (var x=0; x < dateDay.length; x++) 
		{
        	digit = dateDay.substring(x, x+1);
        	if ((digit < "0") || (digit > "9")) 
			{ 
				return false; 
			}
    	}

	    // convert the text day to a number
    	var numDay = 0;
	    for (var x=0; x < dateDay.length; x++) 
		{
        	digit = dateDay.substring(x, x+1);
        	numDay *= 10;
        	numDay += parseInt(digit);
    	}
    
		if ((numDay <= 0) || (numDay > 31)) 
		{ 
			return false; 
		}

	    // February can't be greater than 29 (leap year calculation comes later)
    	if ((numMonth == 2) && (numDay > 29)) 
		{ 
			return false; 
		}

	    // check for months with only 30 days
    	if ((numMonth == 4) || (numMonth == 6) || (numMonth == 9) || (numMonth == 11)) 
		{
        	if (numDay > 30) 
			{ 
				return false; 
			}
    	}

	    // if any non-digits in the year, invalid date
    	for (var x=0; x < dateYear.length; x++) 
		{
        	digit = dateYear.substring(x, x+1);
        	if ((digit < "0") || (digit > "9")) 
			{ 
				return false; 
			}
    	}

	    // convert the text year to a number
    	var numYear = 0;
    	for (var x=0; x < dateYear.length; x++) 
		{
        	digit = dateYear.substring(x, x+1);
        	numYear *= 10;
        	numYear += parseInt(digit);
    	}

	    // Year must be a 2-digit year or a 4-digit year
    	if ( (dateYear.length != 2) && (dateYear.length != 4) ) 
		{ 
			return false; 
		}

	    // if 2-digit year, use 50 as a pivot date
    	if ( (numYear < 50) && (dateYear.length == 2) ) 
		{ 
			numYear += 2000; 
		}

	    if ( (numYear < 100) && (dateYear.length == 2) ) 
		{ 
			numYear += 1900; 
		}

	    if ((numYear <= 0) || (numYear > 9999)) 
		{ 
			return false; 
		}

	    // check for leap year if the month and day is Feb 29
    	if ((numMonth == 2) && (numDay == 29)) 
		{
        	var div4 = numYear % 4;
        	var div100 = numYear % 100;
        	var div400 = numYear % 400;
        
			// if not divisible by 4, then not a leap year so Feb 29 is invalid
        	if (div4 != 0) 
			{ 
				return false; 
			}

	        // at this point, year is divisible by 4. So if year is divisible by
    	    // 100 and not 400, then it's not a leap year so Feb 29 is invalid
        	if ((div100 == 0) && (div400 != 0)) 
			{ 
				return false; 
			}
    	}

	    // date is valid
    	return true;
	}

	function isValidDate(dateStr, format) 
	{
   		if (format == null) 
		{ 
			format = "MDY"; 
		}

	   	format = format.toUpperCase();
   		if (format.length != 3) 
		{ 
			format = "MDY"; 
		}

		if ( (format.indexOf("M") == -1) || (format.indexOf("D") == -1) || (format.indexOf("Y") == -1) ) 
		{ 
			format = "MDY"; 
		}

   		if (format.substring(0, 1) == "Y") 
		{ 
			// If the year is first
      		var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
      		var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
   		} 
		else if (format.substring(1, 2) == "Y") 
		{ 
			// If the year is second
      		var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
      		var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
   		} 
		else 
		{ 
			// The year must be third
      		var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
      		var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
   		}
   
		// If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
   		if ( (reg1.test(dateStr) == false) && (reg2.test(dateStr) == false) ) 
		{ 
			return false; 
		}
   		
		var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was

		// Check to see if the 3 parts end up making a valid date
   		if (format.substring(0, 1) == "M") 
		{ 
			var mm = parts[0]; 
		} 
		else if (format.substring(1, 2) == "M") 
		{ 
			var mm = parts[1]; 
		} 
		else 
		{ 
			var mm = parts[2]; 
		}

		if (format.substring(0, 1) == "D") 
		{ 
			var dd = parts[0]; 
		} 
		else if (format.substring(1, 2) == "D") 
		{ 
			var dd = parts[1]; 
		} 
		else 
		{ 
			var dd = parts[2]; 
		}

		if (format.substring(0, 1) == "Y") 
		{ 
			var yy = parts[0]; 
		} 
		else if (format.substring(1, 2) == "Y") 
		{ 
			var yy = parts[1]; 
		} 
		else 
		{ 
			var yy = parts[2]; 
		}

		if (parseFloat(yy) <= 50) 
		{ 
			yy = (parseFloat(yy) + 2000).toString(); 
		}
   
   		if (parseFloat(yy) <= 99) 
		{ 
			yy = (parseFloat(yy) + 1900).toString(); 
		}
   
   		var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
   
   		if (parseFloat(dd) != dt.getDate()) 
		{ 
			return false; 
		}
   
   		if (parseFloat(mm)-1 != dt.getMonth()) 
		{ 
			return false; 
		}

	   return true;
	}

	function isValidTime(value) 
	{
   		var hasMeridian = false;
   		var re = /^\d{1,2}[:]\d{2}([:]\d{2})?( [aApP][mM]?)?$/;
   		
		if (!re.test(value)) 
		{ 
			return false; 
		}

		if (value.toLowerCase().indexOf("p") != -1) 
		{ 
			hasMeridian = true; 
		}

		if (value.toLowerCase().indexOf("a") != -1) 
		{ 
			hasMeridian = true; 
		}

		var values = value.split(":");
		
		if ( (parseFloat(values[0]) < 0) || (parseFloat(values[0]) > 23) ) 
		{ 
			return false; 
		}

		if (hasMeridian) 
		{
      		if ( (parseFloat(values[0]) < 1) || (parseFloat(values[0]) > 12) ) 
			{ 
				return false; 
			}
   		}
   
   		if ( (parseFloat(values[1]) < 0) || (parseFloat(values[1]) > 59) ) 
		{ 
			return false; 
		}
   
   		if (values.length > 2) 
		{
      		if ( (parseFloat(values[2]) < 0) || (parseFloat(values[2]) > 59) ) 
			{ 
				return false; 
			}
   		}

		return true;
	}

	function checkRequired(field)
	{
		with (field)
		{
  			if (value==null||value=="")
  			{
				return false;
  			}
  			else
  			{
  			return true;
  			}
		}
	}

	function isValidNumber(inpString)
	{
		return /^[-+]?\d+(\.\d+)?$/.test(inpString);
	}

	function trim(value) 
	{
		var temp = value;
   		var obj = /^(\s*)([\W\w]*)(\b\s*$)/;

		if (obj.test(temp)) 
		{ 
			temp = temp.replace(obj, '$2'); 
		}
   
   		var obj = /  /g;
   		while (temp.match(obj)) 
		{ 
			temp = temp.replace(obj, " ");
		}
   		return temp;
	}


	function isValidEmail(emailAddress) 
	{
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(2([0-4]\d|5[0-5])|1?\d{1,2})(\.(2([0-4]\d|5[0-5])|1?\d{1,2})){3} \])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(emailAddress);
	}
	
	
 
	
	