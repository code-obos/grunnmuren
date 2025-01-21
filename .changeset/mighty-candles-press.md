---
'@obosbbl/grunnmuren-react': minor
---

Adding a new `<VideoLoop/>` component that can play a muted video that loops (similar to a gif). The component respects reduced motion settings for users that have this setting enabled. It ensures further accessibility by requiring a visible or invisible description (`alt` or `caption`) of the video content.

Usage:

``` tsx
<VideoLoop
    src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
    format="mp4"
    alt="Frysjaparken er moderne nabolag med flotte uteområder og en nydelig kafé"
/>

<Media>
    <VideoLoop
        src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
        format="mp4"
    />
    <Caption>Frysjaparken er moderne nabolag med flotte uteområder og en nydelig kafé</Caption>
</Media>
```