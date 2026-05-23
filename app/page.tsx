import { BlogPosts } from 'app/components/posts'
import { LatestBlogFeature } from 'app/components/posts'
import { Popup } from 'app/components/popup'
import { PopupCanvas } from 'app/components/popup-canvas'
import { TreasureChest } from 'app/components/treasure-chest'
import { Contacts } from 'app/components/contacts'
import Link from 'next/link'

export default function Page() {
  return (
    <PopupCanvas>
      <Popup
        title=<img 
            src="/images/general/contact-text.png" 
            alt="Contacts"
            className="object-contain h-full"
            width="120"
          />
        initialPosition={{ top: 300, left: 0 }}
        initialZIndex={9}
      >
        <Contacts />
      </Popup>

      {/*<Popup
        title=<img 
            // change this to "Newest blog post"
            src="/images/general/blog-text.png" 
            alt="Blog"
            className="object-contain h-full"
            width="70"
          />
        initialPosition={{ top: 20, right: 0 }}
        width="20rem"
        initialZIndex={10}
      >
        <LatestBlogFeature />
      </Popup>*/}

      <Popup
        title=<img 
            // Change this to All my friends!
            src="/images/general/treasure-text.png" 
            alt="Contacts"
            className="object-contain h-full"
            width="130"
          />
        initialPosition={{ top: -20, left: 0 }}
        width="20rem"
        initialZIndex={10}
      >
        <TreasureChest />
      </Popup>
    </PopupCanvas>
  )
}
