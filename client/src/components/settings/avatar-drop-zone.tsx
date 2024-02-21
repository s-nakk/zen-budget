import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button} from "@/components/ui/button";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {IoCloseSharp} from "react-icons/io5";
import {useToast} from "@/components/ui/use-toast";
import {getFileUploadErrorMessage} from "@/lib/utils/utils";

// ファイルの型を拡張してプレビューURLを含める
interface AvatarDropZoneProps {
  file: File | null; // 現在のファイル
  selectFile: (newFile: File | null) => void;
  previewUrl: string;
}

export const AvatarDropZone: React.FC<AvatarDropZoneProps> = ({file, selectFile, previewUrl}) => {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [file, previewUrl]);
  const {toast} = useToast();
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      const newFile = acceptedFiles[0] ? acceptedFiles[0] : null;
      selectFile(newFile);
    },
    minSize: 0,
    maxSize: 5242880,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    onDropRejected: fileRejections => {
      const errors: string[] = [];
      fileRejections[0].errors.map(value => errors.push(getFileUploadErrorMessage(value.code)))
      toast({
        title: "アップロードに失敗しました。",
        variant: "destructive",
        description: errors
      })
    }
  });
  useEffect(() => {
    // コンポーネントのクリーンアップ時にプレビューURLを解放
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]); // 依存配列に`preview`を指定
  // ファイルの削除機能
  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview); // 現在のプレビューURLを解放
      setPreview(""); // プレビューをクリア
    }
    selectFile(null); // 親コンポーネントにファイルの削除を通知
  };

  // ファイルのプレビューと削除ボタンを表示
  const filesPreview = (
    <div className="group flex flex-nowrap justify-center items-center hover:opacity-80">
      <Avatar
        className="size-24 relative lg:size-32 z-20 outline-neutral-700 outline-dashed outline-1"   {...getRootProps()}>
        <AvatarImage src={preview} alt="preview"/>
      </Avatar>
    </div>
  )

  return (
    <>
      <div
        className="relative drop-shadow opacity-90 py-2 outline-neutral-500 outline-1 bg-neutral-950 rounded-sm outline-dashed w-40 lg:w-2/3">{filesPreview}
        {preview &&
            <Button type="button" variant="ghost" size="icon" className="absolute top-0 right-0 z-30"
                    onClick={removeFile}>
                <IoCloseSharp className="size-5 text-stone-950 dark:text-white"/>
            </Button>
        }
      </div>
      <p
        className="hidden  whitespace-pre-wrap text-xs lg:flex justify-start items-start text-muted-foreground">
        {"最大ファイルサイズ 5MB\n拡張子 .jpeg/.jpg/.png"}
      </p>
    </>
  );
}