import sqlite3
import json


if __name__ == "__main__":

    connection = sqlite3.connect("/database/database.db")
    cursor = connection.cursor()

    def setup_campaign_table():
        """
        Creates a campaign table with campaign specific data from the seed data
        """
        cursor.execute("DROP TABLE IF EXISTS campaign")
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS campaign (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            )
        """
        )

    def setup_line_item_table():
        """
        Creates a line item table with line item specific data from the seed data
        """
        cursor.execute("DROP TABLE IF EXISTS line_item")
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS line_item (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                campaign_id INTEGER,
                booked_amount REAL,
                actual_amount REAL,
                adjustment REAL,
                FOREIGN KEY (campaign_id) REFERENCES campaign(id)
            );
        """
        )

    setup_campaign_table()
    setup_line_item_table()
    with open("placements_teaser_data.json") as file:
        data = json.load(file)

        campaign_data = set()
        line_item_data = []
        for entry in data:
            campaign_data.add((entry["campaign_id"], entry["campaign_name"]))
            line_item_data.append(
                (
                    entry["line_item_name"],
                    entry["campaign_id"],
                    entry["booked_amount"],
                    entry["actual_amount"],
                    entry["adjustments"],
                )
            )

        cursor.executemany(
            """
            INSERT OR REPLACE INTO campaign (id, name) VALUES (?, ?)
        """,
            (tuple(campaign_data)),
        )

        cursor.executemany(
            """
            INSERT INTO line_item (
                name, 
                campaign_id, 
                booked_amount, 
                actual_amount, 
                adjustment
            )
            VALUES (?, ?, ?, ?, ?)
        """,
            line_item_data,
        )

    connection.commit()
    connection.close()
