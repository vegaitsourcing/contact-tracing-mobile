# Contact Tracing Mobile Application

## Description

A cross-platform mobile application, written in React Native, that serves to help people (with their consent) be notified if they were in contact with a person that was diagnosed with COVID-19.

Communicates with the Diagnosis Server [contact-tracing-backend](https://github.com/vegaitsourcing/contact-tracing-backend) by using the [following API](https://github.com/vegaitsourcing/contact-tracing-backend/wiki/API-Documentation).

Based on [the Contact Tracing API currently being developed by Apple and Google](https://www.blog.google/inside-google/company-announcements/apple-and-google-partner-covid-19-contact-tracing-technology/).

This project was created during the [#EuVsCovid Hackaton](https://euvsvirus.org/).

## How to run

    #Make sure you have NodeJS and npm installed on your environment:
    https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    
    #Make sure you have expo-cli installed: 
    npm install --global expo-cli
    
    #Make sure you have Expo app installed on your phone device or emulator (iOS/Android). 
    You can download the Expo app from the respective app store.
    
    git clone https://github.com/vegaitsourcing/contact-tracing-mobile.git

    cd contact-tracing-mobile
    
    npm install
    
    expo start
    
    scan the QR code displayed in your default browser 
    Android: Scan the QR code from within the Expo app
    iOS: Scan the QR code directly from the phone's Camera app and run the app when prompted 
    
    
