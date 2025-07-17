import React, { useState } from "react";
import { Typography, IconButton, Stack } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Import the copy icon

const TruncateText = ({ copyText, number }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);

  const truncatedText =
    copyText.length > 30 ? `${copyText.slice(0, number || 27)}...` : copyText;

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      onMouseLeave={() => setCopyIcon(false)}
      onMouseEnter={() => setCopyIcon(true)}
    >
      <Typography
        variant="body2"
        sx={{wordBreak:"break-all"}}
      // onMouseLeave={() => setCopyIcon(false)}
      // onMouseEnter={() => setCopyIcon(true)}
      >
        {truncatedText}
      </Typography>
      {isCopied ? (
        <Typography variant="caption">Copied!</Typography>
      ) : (
        <IconButton
          onClick={handleCopyClick}
          color="primary"
          size="small"
          sx={{
            display: copyIcon ? "block" : "none",
            height: "25px",
            width: "25px",
          }}
          aria-label="Copy to clipboard"
        >
          <FileCopyIcon sx={{ maxHeight: "20px", maxWidth: "20px" }} />
        </IconButton>
      )}
    </Stack>
  );
};

export default TruncateText;
