import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateProps } from "../../pages/Create";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../type";
import { v4 } from "uuid";


const CustomForm = ({availableTags, handleSubmit, createTag, markdown = "", title = "", tags = []} : CreateProps) => {
  
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  // form elemanlarının referansını al
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    // yeni note u state e kaydet
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags, // Burada selectedTags'ı kaydediyoruz
    });

    // anasayfaya yönlendir
    navigate("/");
  };
  
  return (
    <Form onSubmit={handleSend} className="mt-4">
      <Stack>
        {/** başlık-etiket inputu */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlık</Form.Label>
              <Form.Control defaultValue={title} ref={inputRef}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                onCreateOption={(text: string) => {
                  // etiket nesnesi oluştur ve id ekle
                  const newTag: Tag = { label: text, value: v4() };

                  // yeni etiketi locale kaydet
                  createTag(newTag);

                  //seçili etiketler state'ine ekle
                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags}
                value={selectedTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>

        {/** içerik alanı */}
        <Form.Group className="mt-4">
          <Form.Label>İçerik (markdown destekler)</Form.Label>
          <Form.Control defaultValue={markdown} ref={textareaRef} as="textarea" style={{minHeight:"300px", maxHeight:"500px"}}/>
        </Form.Group>

        {/** butonlar */}
        <Stack direction="horizontal" className="justify-content-end mt-5" gap={4}>
          <Button type="submit">Kaydet</Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Geri</Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm