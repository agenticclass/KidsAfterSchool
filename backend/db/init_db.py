import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

def initialize_database():
    # Initialize Supabase client
    supabase: Client = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_KEY")
    )

    # Read SQL file
    with open('db/schema.sql', 'r') as f:
        sql_commands = f.read()

    # Execute SQL commands
    try:
        result = supabase.rpc('execute', {'query': sql_commands})
        print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")

if __name__ == "__main__":
    initialize_database()
