import React from 'react';
import LicenseDropdown from './LicenseDropdown';

// 파일 업로드 폼 컴포넌트
export default function UploadForm({ onSubmit }) {
    return (
        <form id="uploadForm" onSubmit={onSubmit}>
            <label htmlFor="file">파일 선택:</label>
            <input type="file" id="file" name="file" accept=".txt, .pdf, .doc, .docx" />
            <label htmlFor="category">분류:</label>
            <input type="text" id="category" name="category" />
            <label htmlFor="summary">요약:</label>
            <textarea id="summary" name="summary" rows="4"></textarea>
            <label htmlFor="license">라이선스:</label>
            <LicenseDropdown />
            <button type="submit">업로드</button>
        </form>
    );
}

