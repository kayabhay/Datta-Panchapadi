import { ReaderLayout } from './components/Reader/ReaderLayout';
import { ChapterView } from './components/Reader/ChapterView';
import { sampleBook } from './data/sample-book';

function App() {
  return (
    <ReaderLayout>
      {sampleBook.chapters.map((chapter) => (
        <div key={chapter.id} id={chapter.id}>
          <ChapterView chapter={chapter} />
        </div>
      ))}
    </ReaderLayout>
  )
}

export default App
