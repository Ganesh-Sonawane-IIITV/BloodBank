import os

def print_file_structure(root_folder, indent=0):
    """
    Recursively prints the file structure of a directory.

    :param root_folder: The root directory whose structure is to be printed.
    :param indent: The indentation level for nested files/folders.
    """
    try:
        for item in os.listdir(root_folder):
            item_path = os.path.join(root_folder, item)
            print(" " * indent + "|-- " + item)
            if os.path.isdir(item_path):
                print_file_structure(item_path, indent + 4)
    except PermissionError:
        print(" " * indent + "|-- [Permission Denied]")

# Specify the folder to inspect
folder_path = input("Enter the folder path to inspect: ")

if os.path.exists(folder_path) and os.path.isdir(folder_path):
    print(f"File structure for '{folder_path}':\n")
    print_file_structure(folder_path)
else:
    print("Invalid folder path.")
