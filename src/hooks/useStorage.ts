import { FSModule } from 'browserfs/dist/node/core/FS';
import * as BrowserFS from 'browserfs';
import { useEffect, useState } from "react";
import { ApiError } from 'next/dist/server/api-utils';

type useFileSystemProps = {
  fs: FSModule | null;
}

const useStorage = ():useFileSystemProps => {
  const [fs, setFs] = useState<FSModule | null>(null);

  useEffect(() => {
    if (!('BrowserFS' in window)) {
      BrowserFS.install(window);
      BrowserFS.configure({
        fs: "IndexedDB",
        options: {},
      }, (e) => {
        if (e) {
          // An error occurred.
          throw e;
        }

        const rootFS = BrowserFS.BFSRequire("fs");
        setFs(rootFS);

      });
    }
  }, [setFs]);

  
  return { fs };
}

export default useStorage;
