// etiket tipi

export type Tag = {
  label: string;
  value: string;
};

// formdan alınacak note tipi
export type NoteData ={
  title:string;
  tags: Tag[];
  markdown: string;

};


// state e kaydedilecek note tipi (id)
export type Note = {
  id: string;
}& NoteData; // üstteki typedan miras aldık 
