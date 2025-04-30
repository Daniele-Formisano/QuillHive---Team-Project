import { MDXEditor } from "@mdxeditor/editor";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function ChapInput({ value, handleChange }) {
  return (
    <div>
      <MDXEditor
        markdown={value}
        onChange={handleChange}
        className="border-2 border-stroke-brand rounded-lg bg-white p-4 min-h-[73vh]"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultLanguage: "js" }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
