'use client';
import{j as e}from"./jsx-runtime-7f3d8b90.js";import{B as i}from"./TextField-66a3ba63.js";import"./Alert-e022997a.js";import"./ButtonColorContext-8eb25ddb.js";import"./index-9353d67f.js";import"./index-68775723.js";import"./clsx-388a5213.js";import"./icons-dbb888f0.js";const q={title:"Campaign",parameters:{layout:"padded"}},d=["https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1611759995/Block%20Watne/Fluks/Mennesker/Bygge-hus-Fluks-arkitekt-ra%CC%8Adgiver","https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1614347690/Block%20Watne/Fluks/Interi%C3%B8r/interi%C3%B8r-standard-ferdighus","https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1612349703/Block%20Watne/Fluks/Illustrasjoner/Bygge-hus-inspirasjon"],t=()=>e.jsx("div",{className:"container flex flex-col gap-16",children:d.map((r,a)=>e.jsx(i,{rightAlignBody:a%2===0,body:e.jsx(i.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel leo et metus aliquet egestas quis vel lorem. Pellentesque in fermentum orci, eget pharetra ex. In maximus dolor id dolor vulputate, a placerat nulla sollicitudin. Sed viverra nisl ac nisi sodales, eu porttitor felis vulputate. Nulla volutpat rutrum dictum. Mauris augue odio, dignissim ac nibh porttitor, accumsan facilisis dui. Mauris ultrices elit in orci scelerisque feugiat."}),image:e.jsx(i.Image,{src:r,alt:""})},a))}),s=()=>{const r=e.jsx(i.Image,{children:e.jsx("img",{src:d[0],alt:""})}),a=e.jsx(i.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel leo et metus aliquet egestas quis vel lorem. Pellentesque in fermentum orci, eget pharetra ex. In maximus dolor id dolor vulputate, a placerat nulla sollicitudin. Sed viverra nisl ac nisi sodales, eu porttitor felis vulputate. Nulla volutpat rutrum dictum. Mauris augue odio, dignissim ac nibh porttitor, accumsan facilisis dui. Mauris ultrices elit in orci scelerisque feugiat."});return e.jsx(i,{className:"container",body:a,image:r})};var o,l,u;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  return <div className="container flex flex-col gap-16">
      {images.map((imageSrc, index) => <Campaign rightAlignBody={index % 2 === 0} key={index} body={<Campaign.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
              leo et metus aliquet egestas quis vel lorem. Pellentesque in
              fermentum orci, eget pharetra ex. In maximus dolor id dolor
              vulputate, a placerat nulla sollicitudin. Sed viverra nisl ac nisi
              sodales, eu porttitor felis vulputate. Nulla volutpat rutrum
              dictum. Mauris augue odio, dignissim ac nibh porttitor, accumsan
              facilisis dui. Mauris ultrices elit in orci scelerisque feugiat.
            </Campaign.Body>} image={<Campaign.Image src={imageSrc} alt="" />} />)}
    </div>;
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var n,m,c;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const image = <Campaign.Image>
      <img src={images[0]} alt="" />
    </Campaign.Image>;
  const body = <Campaign.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel leo et
      metus aliquet egestas quis vel lorem. Pellentesque in fermentum orci, eget
      pharetra ex. In maximus dolor id dolor vulputate, a placerat nulla
      sollicitudin. Sed viverra nisl ac nisi sodales, eu porttitor felis
      vulputate. Nulla volutpat rutrum dictum. Mauris augue odio, dignissim ac
      nibh porttitor, accumsan facilisis dui. Mauris ultrices elit in orci
      scelerisque feugiat.
    </Campaign.Body>;
  return <Campaign className="container" body={body} image={image} />;
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const B=["Default","WithCustomImageComponent"];export{t as Default,s as WithCustomImageComponent,B as __namedExportsOrder,q as default};
//# sourceMappingURL=Campaign.stories-89318bac.js.map
