import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../type";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";
import ReactSelect from "react-select";

interface Props {
  notes: Note[];
  availableTags: Tag[];
}

const Main = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filterNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((noteTag) => noteTag.value == s_tag.value)
      )
  );

  return (
    <div className="container mx-auto py-5">
      {/** üst kısım */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/** form alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags}
                className="text-black"
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/** not listesi */}
      <Row className="g-3 mt-4">
        {filterNotes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;
