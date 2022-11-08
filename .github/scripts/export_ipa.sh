#!/bin/bash

set -eo pipefail

xcodebuild -archivePath $PWD/build/App.xcarchive \
            -exportOptionsPlist ios/App/App/exportOptions.plist \
            -exportPath $PWD/build \
            -allowProvisioningUpdates \
            -exportArchive | xcpretty