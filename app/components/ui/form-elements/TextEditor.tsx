import { FC, useEffect, useState } from 'react'

import styles from './form.module.scss'
import { ITextEditor } from './form.interface'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import cn from 'classnames'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor: FC<ITextEditor> = ({
    onChange,
    value,
    placeholder,
    error
}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    useEffect(() => {
        if (isUpdated) return

        const defaultValue = value || ''
        const blocksFromHtml = htmlToDraft(defaultValue)

        const contentState = ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap
        )

        const newEditorState = EditorState.createWithContent(contentState)
        setEditorState(newEditorState)
    }, [isUpdated])

    const onEditorStateChange = (editorState: EditorState) => {
        setIsUpdated(true)
        setEditorState(editorState)

        return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    const uploadImageCallBack = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                resolve({ data: { link: e.target.result } }); // base64 image as link
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className={cn(styles.common, styles.editorWrapper, 'animate-fade')}>
            <label>
                <span>{placeholder}</span>

                <div className={styles.wrapper}>
                    <Editor
                        toolbarClassName={styles.toolbar}
                        editorClassName={styles.editor}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        spellCheck
                        toolbar={{
                            image: {
                                uploadCallback: uploadImageCallBack,
                                previewImage: true,
                                alt: { present: true, mandatory: false },
                            },
                        }}
                    />
                </div>

                {error && <div className={styles.error}>{error.message}</div>}
            </label>
        </div>
    )
}

export default TextEditor