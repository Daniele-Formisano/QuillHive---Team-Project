import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
} from "@mdxeditor/editor";
import React, { useRef,useState} from "react";

export default function ChapInput({ handleChange, name, value }) {
//   const editRef = useRef("");
// const[value,Setvalue]=useState("");

// const handleGetMarkdown = () => {
//   if (editorRef.current) {
//     const markdown = editorRef.current.getMarkdown()
//     console.log('Current Markdown:', markdown)
//     // Do something with the markdown, like updating state or saving it
//   }
  
// }
// const handleSetMarkdown = () => {
//   if (editorRef.current) {
//     const newMarkdown = '**New markdown content!**'
//     editorRef.current.setMarkdown(newMarkdown)
//     setValue(newMarkdown) // Optionally update state as well
//   }
// }
  return (
    <MDXEditor
      markdown={value}
      placeholder={"Whrite something..."}
      plugins={[
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
      className="w-full h-[80vh] p-4 resize-none rounded-xl text-sm font-script border-2 border-stroke-brand bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all text-input-text-brand placeholder:text-gray-350"
      name={name}
      onChange={handleChange}></MDXEditor>
  );
}
