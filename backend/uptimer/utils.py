"""
General Purpose Utils
"""
import pathlib

def get_allowed_hosts(path: pathlib.Path) -> list[str]:
    """Get list of allowed hosts from path.

    Args:
        path (pathlib.Path): Path to allowed hosts file.

    Returns:
        list[str]: List of allowed hosts
    """
    if not isinstance(path, pathlib.Path):
        raise TypeError(f"Path must be of type 'Path'. Was of type: {type(path)}")

    if not path.exists():
        raise FileNotFoundError(f"Path: '{path}' does not exist.")
    
    with open(path, 'r') as f:
        lines = f.readlines()

    if not lines:
        return []

    return [line.strip() for line in lines]