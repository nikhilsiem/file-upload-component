import { useState } from 'react';
import { FileUploader } from 'baseui/file-uploader';
import { Notification, KIND } from 'baseui/notification';
import { Button } from 'baseui/button';

const FileUpload = () => {
  // Initialize predefined files array
  const [files, setFiles] = useState([]);

  // Handle file upload: triggered when files are selected or dropped
  const handleFileUpload = (acceptedFiles) => {
    // Map the accepted files to a new array of file objects with status: 0 (Pending)
    const newFiles = acceptedFiles.map((file) => ({
      filename: file.name,
      status: 0, // Default status: Pending
    }));

    // Add the new files to the existing files array
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Process each uploaded file
    acceptedFiles.forEach((file) => {
      handleFileProcessing(file);
    });
  };

  // Render file list with status
  const renderFileList = () => {
    return files.map((file, index) => {
      let statusText = 'Pending';
      let notificationKind = KIND.info;

      if (file.status === 1) {
        statusText = 'Processed';
        notificationKind = KIND.success;
      } else if (file.status === -1) {
        statusText = 'Failed';
        notificationKind = KIND.negative;
      }

      return (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            {file.filename} - <span>{statusText}</span>
          </div>
          <Notification kind={notificationKind}>{statusText}</Notification>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>File Upload</h1>

      {/* File Uploader */}
      <FileUploader
        onDropAccepted={handleFileUpload}  // Triggered when files are accepted
        multiple                            // Allow multiple files to be uploaded at once
        overrides={{
          DropZone: {
            style: {
              border: '2px dashed #4D90FE',
              padding: '20px',
            },
          },
        }}
      />

      <div>
        <h2>File List</h2>
        {renderFileList()}  {/* Render the list of files and their statuses */}
      </div>
    </div>
  );
};

export default FileUpload;
