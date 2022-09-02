# PAS
Managing expenses and acounting is a difficult task .As i live on rent with two more partners accounting for daily expenditure was a hard task for me expecially if it's on pen and paper that is why i created Pes (Pesronal Acconting System) to Bring our accounting system online.

Here are the steps to Run this application on your device

1. Create a postgresql database.
2. Make a Table and name it as "ExpenseList".
3. Add 3 Columns and name it as "person","cost", "item","date" and "time" .
4. clone  this repository by "$git clone https://github.com/aayogyadav128/Pes.git"
5. In "index.js" :
5.1 Enter your correct postgres credentials (Replace  'DBUser','DBHost','ReplaceWithDBName', 'DBPassword',DBPort with Your real Credentials).
5.2 To add person copy person lines (line 44 to 55) and paste just below that and replace "_Name" with real person name in data base, Repeat process for all Persons.
6. In "entry.ejs":
6.1.  Copy line 57 and paste it just below that and replace "_Name" with real name in database. Repeat Process for every person in Database.
6.2.  On line 62 replace "Your_IP_or_domain" with ip or domain where you will host it (i.e. if you have hosted it on "http://localhost:300" then replace "Your_IP_or_domain" with "http://localhost:300" without inverted commas).
7. In "show.ejs":
7.1. Copy line 47 and paste it below that and replace _Name with real person in database. Repeat Process for every peson in database.
8. Install app dependencies  by going into project's folder and Running "$npm install"
9. Then run the App From "$node .". (if you are going to use it permanently you can use "pm2").

Enjoy and Happy Accounting.
