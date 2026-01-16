import { ReaderLayout } from './components/Reader/ReaderLayout';
import { ChapterView } from './components/Reader/ChapterView';
import { sampleBook } from './data/sample-book';
import { ReaderProvider } from './context/ReaderContext';

function App() {
  return (
    <ReaderProvider>
      <ReaderLayout>
        {sampleBook.chapters.map((chapter) => (
          <div key={chapter.id} id={chapter.id}>
            <ChapterView chapter={chapter} />
          </div>
        ))}
      </ReaderLayout>
    </ReaderProvider>
  )
}

export default App
