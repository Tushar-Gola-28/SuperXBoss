import * as React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function CategoryTree({
    categories = [],
    defaultSelected = [], // edit mode pre-selected IDs
    onSelectedChange,
}) {
    const [selectedIds, setSelectedIds] = React.useState(
        () => new Set(defaultSelected.map(String))
    );
    React.useEffect(() => {
        setSelectedIds(new Set(defaultSelected.map(String)));
    }, [defaultSelected]);
    // Build child->parent map
    const parentMap = React.useMemo(() => {
        const map = new Map();
        const walk = (nodes, parent = null) => {
            nodes.forEach((n) => {
                const id = String(n._id);
                if (parent) map.set(id, String(parent));
                if (n.children?.length) walk(n.children, id);
            });
        };
        walk(categories);
        return map;
    }, [categories]);

    const getAncestors = (id) => {
        const chain = [];
        let cur = String(id);
        while (parentMap.has(cur)) {
            const parent = parentMap.get(cur);
            chain.push(parent);
            cur = parent;
        }
        return chain;
    };

    // Auto-expand: collect defaultSelected + all ancestors
    const defaultExpandedItems = React.useMemo(() => {
        const expanded = new Set();
        defaultSelected.forEach((id) => {
            expanded.add(String(id));
            getAncestors(id).forEach((ancestor) => expanded.add(ancestor));
        });
        return Array.from(expanded);
    }, [defaultSelected, parentMap]);

    // Update when defaultSelected changes
    React.useEffect(() => {
        setSelectedIds(new Set(defaultSelected.map(String)));
    }, [defaultSelected]);

    const handleCheck = (id, checked) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            const key = String(id);

            if (checked) {
                next.add(key);
                getAncestors(key).forEach((a) => next.add(a));
            } else {
                next.delete(key);
            }

            onSelectedChange?.(Array.from(next));
            return next;
        });
    };

    const renderLabel = (node) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
                size="small"
                checked={selectedIds.has(String(node._id))}
                onChange={(e) => {
                    e.stopPropagation();
                    handleCheck(node._id, e.target.checked);
                }}
                onClick={(e) => e.stopPropagation()}
            />
            <Typography variant="body2">{node.name}</Typography>
        </Box>
    );

    const renderTree = (nodes) =>
        nodes.map((node) => (
            <TreeItem key={String(node._id)} itemId={String(node._id)} label={renderLabel(node)}>
                {node.children?.length ? renderTree(node.children) : null}
            </TreeItem>
        ));

    return (
        <SimpleTreeView
            defaultExpandedItems={defaultExpandedItems} // auto-open checked and ancestors
            slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }}
        >
            {renderTree(categories)}
        </SimpleTreeView>
    );
}
