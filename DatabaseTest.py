import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="Aan",
    passwd="Abc123de45",
    database="testdata"
)

mycursor = db.cursor()

mycursor.execute("SELECT * FROM Article WHERE AccId = 2")

for x in mycursor:
    print(x)
# print(type(mycursor))


# mycursor.execute("CREATE TABLE Article (AccId int PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(50), datetime VARCHAR(50), Title TEXT, Content MEDIUMTEXT)")

# mycursor.execute("INSERT INTO Article (Username, datetime, Title, Content) VALUES (%s, %s, %s, %s)", ("Supiraru", "23: 16 , 27/08/2020", " THIS IS FIRST ARTICLE", " THIS IS JUST A TESTING ARTICLE , SORRY"))

db.commit()


db.close()