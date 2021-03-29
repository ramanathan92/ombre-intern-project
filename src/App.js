import React, { useState,useEffect} from "react";
import './App.css';
import { storage } from "./firebase/firebase";

function App() {
  const allInputs = [{ imgUrl: '' }];
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState([allInputs]);
  const [allImages,setAllImages] = useState([]);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => (image));
  };

    

    const fetchImages = async () => {

    let result = await storage.ref('/images').listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        console.log(urlPromises);
        return await Promise.all(urlPromises);

    };
    
    const loadImages = async () => {
        const urls = await fetchImages();
        console.log(urls);
        //setAllImages(oldArray => [...oldArray, urls]);
        setAllImages(urls);
        console.log(allImages);
    };


    useEffect(() => {
      loadImages();
  },[]);

  const handleFireBaseUpload = e => {
    e.preventDefault();
    console.log('start of upload');
    console.log(imageAsFile.name);
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed',
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot);
    }, (err) => {
      //catches the errors
      console.log(err);
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          console.log(fireBaseUrl);
          let newArr = [...imageAsUrl]; // copying the old datas array
          newArr.push({imgUrl: fireBaseUrl }); // replace e.target.value with whatever you want to change it to
          setImageAsUrl(newArr);  
          setAllImages([...allImages,fireBaseUrl]);
        });
    });

  };

 

  return (
    <div className="App">
      <div className="header-class">
        <div className="header-title">
          INSTAGRAM
          </div>
        <div className="header-search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="div-box-header-items">
          <div class="header-items">
          <i class="gg-home-alt header-icon-pos"></i>
          </div>
          <div class="header-items">
          <i class="gg-notifications header-icon-pos"></i>
          </div>
          <div class="header-items">
          <i class="gg-heart header-icon-pos"></i>
          </div>
          <div class="header-items">
          <i class="gg-bookmark header-icon-bookmark"></i>
          </div>
          <div class="header-items"></div>
        </div>
        
      </div>

      <div className="div-content-body-class">
        <div>
        
        </div>
        <div className="div-profile-details-box">

          <div className="div-profile-pic">
            <span className="span-profile-pic-content">
              OMBRE
            </span>
          </div>

          <div className="div-profile-content-details">
            <div>
              <span className="span-profile-name-text">livewithombre</span>
              <input className="edit-profile-button" type="button" value="Edit profile" />
              <span className="settings-button "><i class="gg-support"></i></span>
            </div>
            <div className="div-user-profile-followers-details-box">
              <span className="span-followers-text"><b>193</b> posts</span>
              <span className="span-followers-text"><b>7,543</b>  followers</span>
              <span className="span-followers-text"><b>7,908</b>  following</span>
            </div>
            <div>
              <b> OMRE | Hub for Live Music </b>
            </div>
            <div>
              <span>App Page</span>
            </div>
            <div>
              Sharing <b>LIVE</b>  streaming music around the world
              </div>
            <div>
              running round the clock for you
              </div>
            <div>
              DM for collaboration for events
              </div>
            <div>
              Check out our app!!
              </div>
            <div>
              <a>linktr.ee/Livewithombre</a>
            </div>

          </div>

        </div>
        <div className="div-stories-box">
          <div className="div-story-each-box">
          <i class="gg-add-r"></i>
          </div>
          <div className="div-story-each-box">
          <i class="gg-add-r"></i>
          </div>
          <div className="div-story-each-box">
          <i class="gg-add-r"></i>
          </div>
          <div className="div-story-each-box">
          <i class="gg-add-r"></i>
          </div>
        </div>
        
        <div class="div-upload-form">
        <form onSubmit={handleFireBaseUpload}>
          <input
            type="file"
            onChange={handleImageAsFile}
          />
          <button>upload to firebase</button>
        </form>
          </div>
        <div className="div-posts-box">
          <div className="div-post-box-title">
            <span> POSTS </span>
            <span> REELS </span>
            <span> IGTV </span>
            <span> SAVED </span>
            <span> TAGGED </span>
          </div>
        </div>
        <div className="div-all-posts-box">

                { allImages.map(url => (
               <div key={url} className="div-each-post-box">
                <img className="image-box" src={url} alt="image tag" />
                </div>
                ))}
         
        </div>
      </div>

    </div>
  );
}

export default App;
