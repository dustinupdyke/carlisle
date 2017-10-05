@ECHO OFF
:: Check validity of command line parameters:
:: *** 2 command line parameters needed
IF [%2]==[] GOTO Syntax
:: *** second parameter should be a number greater than 0
IF %2 LSS 0 GOTO Syntax
:: ** first parameter must be a valid file specification
IF NOT EXIST %1 GOTO Syntax
:: *** first parameter must be a file name, not a directory
DIR /A-D /B %~nx1 2>NUL | FIND /I "%~nx1" >NUL
IF ERRORLEVEL 1 GOTO Syntax
:: *** no wildcards allowed in file specification
ECHO.%* | FIND "*" >NUL
IF NOT ERRORLEVEL 1 GOTO Syntax
ECHO.%* | FIND "?" >NUL
IF NOT ERRORLEVEL 1 GOTO Syntax
 
:: Keep variables local
SETLOCAL
:: Second parameter is the specified minimum file size
SET CMPSIZE=%2
:: Remove delimiters from file size; adjust if not used in US version of NT
SET CMPSIZE=%CMPSIZE:,=%
:: Check specified file's actual size
FOR /F "tokens=3* delims= " %%A IN ('DIR %1 /-C /N ^| FIND /I "%~nx1"') DO SET ACTSIZE=%%A
:: Compare file size to specified minimum size and display result
IF %CMPSIZE% EQU %ACTSIZE% ECHO Sizes match exactly
IF %CMPSIZE% LSS %ACTSIZE% ECHO Actual file size exceeds specified size
IF %CMPSIZE% GTR %ACTSIZE% ECHO Actual file size less than specified file size
:: Set an errorlevel if actual file size is less than specified minimum
IF %CMPSIZE% LEQ %ACTSIZE% COLOR 00
ENDLOCAL
GOTO:EOF
 
:Syntax
ECHO.>CON
ECHO ChkSize,  Version 1.00 for Windows NT 4>CON
ECHO Checks if file size matches specified file>CON
ECHO size and returns an errorlevel accordingly>CON
ECHO Restriction:>CON
ECHO will not handle sizes over 2GB correctly>CON
(ECHO Usage   :  CHKSIZE  ^<filespec^>  ^<minimum_size^>)>CON
ECHO.>CON
ECHO Returns :  Errorlevel 0 if greater than or equal to specified file size>CON
ECHO            Errorlevel 1 if smaller than specified file size>CON
ECHO.>CON
(ECHO Do not use wildcards in ^<filespec^>)>CON
ECHO ^<filespec^> must be enclosed in double quotes if it contains spaces>CON
GOTO:EOF