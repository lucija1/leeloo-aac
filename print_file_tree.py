import os
from pathlib import Path
from typing import Optional

def get_file_icon(path: Path) -> str:
    """Return an appropriate icon for the file type."""
    if path.is_dir():
        return "📁"
    
    # Common file types
    extensions = {
        # Documents
        '.txt': "📄", '.doc': "📄", '.docx': "📄", '.pdf': "📕",
        '.md': "📝", '.rst': "📝",
        # Images
        '.jpg': "🖼️", '.jpeg': "🖼️", '.png': "🖼️", '.gif': "🖼️",
        '.svg': "🖼️", '.bmp': "🖼️",
        # Code
        '.py': "🐍", '.js': "📜", '.html': "🌐", '.css': "🎨",
        '.cpp': "📜", '.c': "📜", '.java': "☕",
        # Archives
        '.zip': "📦", '.rar': "📦", '.7z': "📦", '.tar': "📦",
        '.gz': "📦",
        # Data
        '.json': "📊", '.csv': "📊", '.xlsx': "📊", '.xml': "📊",
        # Executables
        '.exe': "⚙️", '.sh': "⚙️", '.bat': "⚙️",
        # Media
        '.mp3': "🎵", '.wav': "🎵", '.mp4': "🎬", '.avi': "🎬",
        '.mov': "🎬"
    }
    
    return extensions.get(path.suffix.lower(), "📄")  # Default to generic file icon

def print_directory_tree(
    root_dir: str | Path,
    max_depth: Optional[int] = None,
    current_depth: int = 0,
    prefix: str = "",
    is_last: bool = True
) -> None:
    """
    Print a directory tree structure with configurable maximum depth and file/folder icons.
    
    Args:
        root_dir: Root directory to start listing from
        max_depth: Maximum depth to traverse (None for unlimited)
        current_depth: Current recursion depth (used internally)
        prefix: Prefix for current line (used internally for drawing)
        is_last: Whether current item is last in its parent (used internally)
    """
    root_dir = Path(root_dir)
    
    # Print current directory/file
    if current_depth == 0:
        print(f"{get_file_icon(root_dir)} {root_dir.name}")
    else:
        connector = "└── " if is_last else "├── "
        print(f"{prefix}{connector}{get_file_icon(root_dir)} {root_dir.name}")
    
    # Stop if we've reached max_depth
    if max_depth is not None and current_depth >= max_depth:
        return
    
    # Get all items in directory, sort directories first then files
    try:
        items = sorted(
            root_dir.iterdir(),
            key=lambda x: (not x.is_dir(), x.name.lower())
        )
    except PermissionError:
        print(f"{prefix}{'    ' if is_last else '│   '}⚠️ <Permission Denied>")
        return
    except Exception as e:
        print(f"{prefix}{'    ' if is_last else '│   '}❌ <Error: {str(e)}>")
        return
    
    # Process each item
    for i, path in enumerate(items):
        new_prefix = prefix + ("    " if is_last else "│   ")
        print_directory_tree(
            path,
            max_depth,
            current_depth + 1,
            new_prefix,
            i == len(items) - 1
        )

print_directory_tree('.',1)