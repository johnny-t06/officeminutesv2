# OfficeMinutes
A streamlined queuing system for students to queue public/private questions, and groups up students that have similar questions during office hours. Students describe their problems with short titles and weekly-specific tags, giving course staff gain a quick insight to optimize the teaching experience.  

Originally developed in 2024 during a Tufts hackathon. https://github.com/jzhang43/OfficeMinutes https://www.linkedin.com/pulse/officeminutes-tufts-jumbohack-johnny-tan-dnouf/.

Now, reimagined with new designs with a mobile-first approach and better implementations.  

## Features

<img width="286" alt="image" src="https://github.com/user-attachments/assets/cc626677-2f67-48d9-bd17-48ca2b8b0222" />
<img width="284" alt="image" src="https://github.com/user-attachments/assets/44e92c7e-d36f-43b5-b2c0-3d0a7015e780" />
<img width="282" alt="image" src="https://github.com/user-attachments/assets/3702cf99-8528-45e2-91f7-9f1786e9e41e" />

Home, Board, and Queue pages shown.

OfficeMinutes supports Teaching Assistance (TA) views and student views.

TAs can add announcements, manage the queue by helping students or mark students as missing. 

Students can view class information add public or private questions, and join public question groups.



## To run locally
You will need to initialize a Firebase project and extract the following keys. Download packages with npm and run ``` npm run dev ```. View on localhost:3000. 

### Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
BYPASS_AUTH = ""
FIREBASE_PRIVATE_KEY=""
NODE_ENV=""
```


