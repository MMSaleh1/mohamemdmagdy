#!/bin/sh
pushd plugins/com.catchoom.craftar/src/ios/CraftARCloudImageRecognitionSDK.framework
ln -s -f Versions/A/Headers/ Headers
ln -s -f Versions/A/CraftARCloudImageRecognitionSDK CraftARCloudImageRecognitionSDK
cd Versions
ln -s -f A Current
cd -
popd

pushd plugins/com.catchoom.craftar/src/ios/Pods.framework
ln -s -f Versions/A/Headers/ Headers
ln -s -f Versions/A/Pods Pods
cd Versions
ln -s -f A Current
cd -
popd
