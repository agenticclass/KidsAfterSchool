-- Create parent-child relationship table
CREATE TABLE parent_child_relationships (
    id SERIAL PRIMARY KEY,
    parent_id UUID NOT NULL REFERENCES profiles(id),
    child_id UUID NOT NULL REFERENCES profiles(id),
    relationship_type TEXT NOT NULL DEFAULT 'parent',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_parent_child_pair UNIQUE (parent_id, child_id)
);

-- Create index for faster lookups
CREATE INDEX idx_parent_child_relationships_parent_id ON parent_child_relationships(parent_id);
CREATE INDEX idx_parent_child_relationships_child_id ON parent_child_relationships(child_id);

-- Add trigger for automatic updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_parent_child_relationships_updated_at
BEFORE UPDATE ON parent_child_relationships
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();
