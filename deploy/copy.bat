@ECHO OFF
:: Check Windows version
IF NOT "%OS%"=="Windows_NT" GOTO Syntax
 
:: Enable delayed variable expansion
SETLOCAL ENABLEDELAYEDEXPANSION
 
:: Check command line arguments
ECHO.%* | FINDSTR /R /C:"[?\*]" >NUL && GOTO Syntax
IF     "%~2"=="" GOTO Syntax
IF NOT "%~3"=="" IF /I NOT "%~3"=="/ROBOCOPY" GOTO Syntax
IF NOT EXIST "%~f1.\" GOTO Syntax
IF NOT EXIST "%~f2.\" GOTO Syntax
 
:: Initialize variables
SET Files1=
SET Files2=
SET Temp1=
SET Temp2=
SET Title=
 
:: Save the current title if possible
FOR /F "tokens=*" %%A IN ('GetTitle2.exe /NC /NP 2^>NUL') DO SET Title=%%A
 
:: Navigate to the first folder, giving it a drive letter on the fly in case of a UNC type path
PUSHD "%~f1" >NUL 2>&1 || GOTO Syntax
FOR %%A IN ("%CD%") DO SET Files1="%%~dpA*.*"
POPD
 
:: Navigate to the second folder, giving it a drive letter on the fly in case of a UNC type path
PUSHD "%~f2" >NUL 2>&1 || GOTO Syntax
FOR %%A IN ("%CD%") DO SET Files2="%%~dpA*.*"
POPD
 
:: Navigate to the TEMP folder
PUSHD "%Temp%" >NUL 2>&1 || GOTO Syntax
FOR %%A IN ("%CD%") DO (
	SET Temp1="%%~dpA%~n0.tmp"
	SET Temp2="%%~dpA%~n0.tmp"
)
POPD
 
:: Create 2 lists of files to be uodated
XCOPY %Files1% %Files2% /S /D /H /R /Y /L | FIND "\" > %Temp1%
XCOPY %Files2% %Files1% /S /D /H /R /Y /L | FIND "\" > %Temp2%
 
:: Replicate the directory structure of source on target
XCOPY %Files1% %Files2% /T /E /Y >NUL 2>&1
 
:: Count the number of files moved and directories created
SET FilesMoved=0
 
:: For each file in the first list ...
FOR /F "tokens=*" %%A IN ('TYPE %Temp1%') DO (
	TITLE %%A
	REM :: ... check for duplicates on either drive
	SET Error=0
	TYPE FIND /C /I "%%~nxA" %Temp1% | FINDSTR /R /X /C:"1" >NUL || SET Error=1
	TYPE FIND /C /I "%%~nxA" %Temp2% | FINDSTR /R /X /C:"1" >NUL || SET Error=1 
	REM :: If no duplicates were found ...
	IF !Error! EQU 0 (
		REM ... find the location of the file to be moved ...
		FOR /F "tokens=*" %%B IN ('FINDSTR /R /E /I /C:"\\%%~nxA" %Temp2%') DO (
			REM :: ... move the file to its new location
			SET /P "=%%~fB -> %%~dB%%~pA    	" < NUL
			MOVE "%%~fB" "%%~dB%%~pA"
			SET /A FilesMoved += 1
		)
	) ELSE (
		ECHO Skipped "%%~A" ^(duplicates or not found^)
	)
)
 
IF %FilesMoved% EQU 1 (
	ECHO Moved 1 file.
	TITLE Moved 1 file.
) ELSE (
	ECHO Moved %FilesMoved% files.
	TITLE Moved %FilesMoved% files.
)
 
:: Run ROBOCOPY if specified
IF /I "%~3"=="/ROBOCOPY" (
	SET Options=
	SET Counter=0
	FOR %%A IN (%*) DO (
		SET /A Counter += 1
		IF !Counter! GTR 3 (
			IF /I NOT "%%~A"=="/MIR" (
				SET Options=!Options! %%A
			)
		)
	)
	ROBOCOPY "%~f1" "%~f2" /MIR !Options!
)
 
:Clean up
IF DEFINED Title TITLE %Title%
DEL %Temp1% >NUL 2>&1
DEL %Temp2% >NUL 2>&1
ENDLOCAL
GOTO:EOF
 
 
:Syntax
ECHO.
ECHO RoboMove.bat,  Version 0.30 beta
ECHO Move files in the target folders to natch their location in the source folder.
ECHO If run before RoboCopy, the latter won't have to delete moved files and then
ECHO copy them again to their new location (most useful on network drives).
ECHO.
ECHO Usage:  ROBOMOVE  source_folder  target_folder
ECHO         ROBOCOPY  source_folder  target_folder  /MIR  [ robocopy_options ]
ECHO.
ECHO or:     ROBOMOVE  source_folder  target_folder  /ROBOCOPY  [ robocopy_options ]
ECHO.
ECHO Where:  source_folder     the source folder, used as a template for the target
ECHO         target_folder     the target folder, where the files will be moved to
ECHO                           match the source folder as closely as possible
ECHO         /ROBOCOPY         run ROBOCOPY /MIR on the specified folders afterwards
ECHO         robocopy_options  are the switches passed on to ROBOCOPY
ECHO.
ECHO Notes:  Folders MUST be specified as fully qualified paths, either in
ECHO         drive:\path or UNC format; do not specify files.
ECHO.
 
IF "%OS%"=="Windows_NT" ENDLOCAL
IF "%OS%"=="Windows_NT" EXIT /B 1