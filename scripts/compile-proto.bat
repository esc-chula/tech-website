@echo off
setlocal

REM Set the extension for Windows executable
set "EXT=.CMD"

REM Define paths
set "PROTO_PATH=%cd%\proto"
set "GEN_TS_PROTO_PATH=%cd%\node_modules\.bin\protoc-gen-ts_proto%EXT%"
set "OUTPUT_PATH=%cd%\src\generated"

REM Check if the output directory exists, and create it if it does not
if not exist "%OUTPUT_PATH%" (
    mkdir "%OUTPUT_PATH%"
)

REM Run protoc on all .proto files found in the proto directory
for /r "%PROTO_PATH%" %%f in (*.proto) do (
    protoc ^
        -I "%PROTO_PATH%" ^
        --plugin=protoc-gen-ts_proto="%GEN_TS_PROTO_PATH%" ^
        --ts_proto_opt=outputServices=grpc-js ^
        --ts_proto_out="%OUTPUT_PATH%" ^
        "%%f"
)

endlocal
