import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="Aan",
    passwd="Abc123de45",
    database="testdata"
)

mycursor = db.cursor()

mycursor.execute("SELECT * FROM Account")

for x in mycursor:
    print(x)


# mycursor.execute("CREATE TABLE Test (AccId int PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(50), Name VARCHAR(50), Email VARCHAR(50))")

# mycursor.execute("INSERT INTO Test (Username, Name, Email) VALUES (%s, %s, %s)", ("Supsaaaaaaaa", "AAN", " 123@gmail.com"))

# db.commit()


# db.close()