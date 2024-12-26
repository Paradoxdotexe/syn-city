import { useEffect, useState } from 'react';

export const useImage = (url: string) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    import(`../../images/${url}`).then(response => setImage(response.default))
  }, [url]);

  return image;
};
