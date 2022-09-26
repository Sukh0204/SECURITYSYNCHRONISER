# SECURITYSYNCHRONISER

**Why was there a need for the project?**


The transfer of huge volumes of data without any leaks, has always been an area of concern for an organization. Currently database synchronization systems
are over the web but LAN is not only faster but also has a consistent speed and can hence accommodate transfer of a large amount of data. This synchronization also 
occurs discreetly which is otherwise difficult to achieve with the existing systems. In addition to this data sent over LAN can only be accessed by devices that are 
physically attached to that network, and thus there is no chance of data loss or hacking hence data need not be encrypted. Conventional approaches of data transfer on t
he cloud pose a risk of security breach and approaches such as FTP are difficult to implement when this data transfer is occurring very frequently. In addition to this 
FTP lacks security as data, username, and password are all shared in plain text. Hence the need was felt to develop a tool to transfer data securely and quickly between 
two systems connected via ethernet. 

**Problem Statement and Purpose of Project**


Transmission of huge volumes of data has always been an area of concern for an organization. It is important that the data remain private, without any leaks
and is transferred at a quick rate nonetheless. Conventional approaches such as data transfer on the cloud are out of the picture due to risks of security breach and 
approaches such as FTP are difficult to implement when this data transfer is occurring very frequently. Hence the need was felt to develop a tool to transfer data 
securely and quickly between two systems connected via ethernet.


**Proposed Solution**


Software described in the document is created for synchronization of two separate databases over LAN ethernet with an interactive GUI. The system will allow users to
upload the spatial data in form of CSV files and save it in a local database. The host can then choose to Sync the data with the other system(s) by simply clicking on
a sync button. This will be an accurate, user-friendly, intelligent and efficient product which would be specific to the needs of high security organisations and meet the requirements of end users and planners, which can help in data transfer and management.

**Software Requirements**

The folowing software are required for the project to run on your system:
NodeJS
NPM pacakge manager
MongoDB (Compass and Robo3T)

**Intructions to run the code**

To install all the node dependencies use:
npm install

To run the code use:
npm start


**Thankyou**
