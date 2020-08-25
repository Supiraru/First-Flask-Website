import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="Aan",
    passwd="Abc123de45",
    database="testdata"
)

mycursor = db.cursor()

# mycursor.execute("CREATE TABLE Account (AccId int PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(50), Name VARCHAR(50), Email VARCHAR(50))")

# db.close()