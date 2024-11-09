import React, { useState } from 'react';
import { FileUploader } from 'baseui/file-uploader';
import { Block } from 'baseui/block';
import { Notification } from 'baseui/notification';

export default function Home() {
  // Initial predefined files with their statuses
  const [files, setFiles] = useState([]);

  // Handle the file upload
  const handleDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const newFiles = rejectedFiles.map(file => ({
        filename: file.name,
        status: -1, 
      }));

      // Update the file list
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      // If files are rejected, show an error message
      console.error('Some files were rejected:', rejectedFiles);
    } else {
      // Add each accepted file to the state with a status of 0 (Pending)
      const newFiles = acceptedFiles.map(file => ({
        filename: file.name,
        status: 0, // Initial status is 0 (Pending)
      }));

      // Update the file list
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // Check if all files are either 1 or -1 (processed or failed)
  const isProcessingComplete = files.every(file => file.status === 1 || file.status === -1);

  return (
    <div>
      <Block marginBottom="scale800">
        <h1>File Upload with Status Tracking</h1>
      </Block>

      {/* FileUploader component */}
      <Block margin="scale4000">
        <FileUploader
          accept="image/*,application/pdf, .csv" // Allow specific file types
          multiple={true} // Allow multiple file uploads
          onDrop={handleDrop} // Handle file drop event
        />
      </Block>
     
      {/* Display dynamic file status */}
      <Block marginTop="scale800">
        <h3>Uploaded Files:</h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <strong>{file.filename}</strong> -{' '}
                <span style={{ color: getStatusColor(file.status) }}>
                  {getStatusText(file.status)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </Block>

      {/* Display notification if all files are processed or failed */}
      {isProcessingComplete && (
        <Notification kind="positive" closeable>
          All files have been processed.
        </Notification>
      )}
    </div>
  );

  // Helper function to get status text
  function getStatusText(status) {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Processed';
      case -1:
        return 'Failed';
      default:
        return 'Unknown';
    }
  }

  // Helper function to get color based on status
  function getStatusColor(status) {
    switch (status) {
      case 0:
        return 'orange'; // Pending
      case 1:
        return 'green'; // Processed
      case -1:
        return 'red'; // Failed
      default:
        return 'gray'; // Unknown
    }
  }
}
