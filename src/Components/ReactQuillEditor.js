import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
function ReactQuillEditor({ control, name, modules, id }) {
  return (
    <>
      {/* <label>Editor Content</label> */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            id={id}
            theme="snow"
            modules={modules}
            value={field.value}
            onChange={(content) => field.onChange(content)}
          />
        )}
      />
    </>
  );
}

export default ReactQuillEditor;
