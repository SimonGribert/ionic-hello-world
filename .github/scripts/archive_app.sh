#!/bin/bash

set -eo pipefail

xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -sdk iphoneos \
            -configuration AppStoreDistribution \
            -archivePath $PWD/build/App.xcarchive \
            clean archive | xcpretty