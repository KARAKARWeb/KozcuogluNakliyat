"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Minus,
  Eye,
  Code,
} from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = "İçerik yazın..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSource, setShowSource] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sourceContent, setSourceContent] = useState("");
  const isInternalChange = useRef(false);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Content sync - dışarıdan gelen değişiklikleri editöre yansıt
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current && !showSource) {
      const currentContent = editorRef.current.innerHTML;
      const newContent = content || "";
      
      // Sadece gerçekten farklıysa güncelle (infinite loop önleme)
      if (currentContent !== newContent && currentContent.trim() !== newContent.trim()) {
        editorRef.current.innerHTML = newContent;
      }
    }
    isInternalChange.current = false;
  }, [content, showSource]);

  // Source mode content sync
  useEffect(() => {
    if (showSource) {
      setSourceContent(content);
    }
  }, [showSource, content]);

  // Auto-save cleanup
  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, []);

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      const newContent = editorRef.current.innerHTML;
      
      setHasUnsavedChanges(true);
      
      // Auto-save with debounce (1 second)
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
      
      autoSaveTimer.current = setTimeout(() => {
        onChange(newContent);
        setHasUnsavedChanges(false);
      }, 1000);
    }
  }, [onChange]);

  const handleSourceChange = useCallback((newSource: string) => {
    setSourceContent(newSource);
    setHasUnsavedChanges(true);
    
    // Auto-save source changes
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    
    autoSaveTimer.current = setTimeout(() => {
      onChange(newSource);
      setHasUnsavedChanges(false);
    }, 1000);
  }, [onChange]);

  const toggleSourceMode = useCallback(() => {
    if (showSource) {
      // HTML → Normal: Apply source changes immediately
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
      onChange(sourceContent);
      setHasUnsavedChanges(false);
      setShowSource(false);
    } else {
      // Normal → HTML: Save current editor content
      if (editorRef.current) {
        const currentContent = editorRef.current.innerHTML;
        if (autoSaveTimer.current) {
          clearTimeout(autoSaveTimer.current);
        }
        onChange(currentContent);
        setSourceContent(currentContent);
        setHasUnsavedChanges(false);
      }
      setShowSource(true);
    }
  }, [showSource, sourceContent, onChange]);

  const addLink = useCallback(() => {
    const url = window.prompt("URL girin:");
    if (url) exec("createLink", url);
  }, [exec]);

  const addImage = useCallback(() => {
    const url = window.prompt("Görsel URL girin:");
    if (url) exec("insertImage", url);
  }, [exec]);

  const insertHeading = useCallback((level: number) => {
    exec("formatBlock", `h${level}`);
  }, [exec]);

  const ToolbarButton = ({ onClick, children, title, active }: { onClick: () => void; children: React.ReactNode; title: string; active?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded p-1.5 transition ${active ? "bg-[#122032] text-white" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {children}
    </button>
  );

  if (showSource) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b bg-gray-50 p-1.5">
          <div className="flex items-center gap-1">
            <ToolbarButton onClick={toggleSourceMode} title="Görsel Editör" active>
              <Eye className="h-4 w-4" />
            </ToolbarButton>
            <span className="ml-2 text-xs text-muted-foreground">HTML Kaynak Kodu</span>
          </div>
          {hasUnsavedChanges && (
            <span className="text-xs text-amber-600 font-medium animate-pulse">
              Kaydediliyor...
            </span>
          )}
        </div>
        {hasUnsavedChanges && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800">
            ⚠️ Değişiklikleriniz otomatik olarak kaydediliyor. Görsel editöre geçmeden önce kaydetmeniz önerilir.
          </div>
        )}
        <textarea
          value={sourceContent}
          onChange={(e) => handleSourceChange(e.target.value)}
          className="w-full min-h-[200px] p-4 font-mono text-sm focus:outline-none resize-y"
          placeholder="<p>HTML içerik yazın...</p>"
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="flex flex-wrap items-center justify-between border-b bg-gray-50 p-1.5">
        <div className="flex flex-wrap items-center gap-0.5">
        <ToolbarButton onClick={() => exec("bold")} title="Kalın">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="İtalik">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} title="Altı Çizili">
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("strikeThrough")} title="Üstü Çizili">
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={() => insertHeading(2)} title="Başlık 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => insertHeading(3)} title="Başlık 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "p")} title="Paragraf">
          <span className="text-xs font-bold">P</span>
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Madde İşareti">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} title="Numaralı Liste">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "blockquote")} title="Alıntı">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertHorizontalRule")} title="Yatay Çizgi">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={() => exec("justifyLeft")} title="Sola Hizala">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyCenter")} title="Ortala">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} title="Sağa Hizala">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={addLink} title="Link Ekle">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Görsel Ekle">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={() => exec("undo")} title="Geri Al">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("redo")} title="İleri Al">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-gray-300" />

        <ToolbarButton onClick={toggleSourceMode} title="HTML Kaynak">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        </div>
        {hasUnsavedChanges && (
          <span className="text-xs text-amber-600 font-medium animate-pulse mr-2">
            Kaydediliyor...
          </span>
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        className="prose prose-sm max-w-none min-h-[200px] p-4 focus:outline-none prose-headings:text-[#122032] prose-a:text-[#e3000f]"
        data-placeholder={placeholder}
      />
    </div>
  );
}
