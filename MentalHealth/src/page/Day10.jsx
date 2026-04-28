import React, { useEffect, useRef, useState } from "react";
import { fromEvent , of, from} from "rxjs";
import { map, tap, filter,switchMap} from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

export default function Day10() {
  console.log("1️⃣ Component Rendered");

  const buttonRef = useRef(null);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("2️⃣ useEffect started");

    if (!buttonRef.current) {
      console.log("❌ Button not found");
      return;
    }

    console.log("3️⃣ Creating Observable...");

    const clicks$ = fromEvent(buttonRef.current, "click").pipe(
      tap(() => console.log("4️⃣ Click event detected inside stream")),
      map((e) => {
        console.log("5️⃣ Mapping event to coordinates");
        return { x: e.clientX, y: e.clientY };
      })
    );

    console.log("6️⃣ Subscribing to Observable...");

    const subscription = clicks$.subscribe((pos) => {
      console.log("7️⃣ Subscriber received:", pos);
      setClickPos(pos);
    });

    return () => {
      console.log("8️⃣ Unsubscribing...");
      subscription.unsubscribe();
    };
  }, []);

  //output 1,2,3
    console.log("of");
  const obs$ = of(1,2,3);
  obs$.subscribe(value => console.log(value));
  

  //output 10,20,30
    console.log("from");
  const arr = [10,20,30];
  const obs1$ = from(arr);
  obs1$.subscribe(value => console.log(value));
  obs$.subscribe(value => console.log(value));

  //output 2, 4, 6
    console.log("map");
  of(1,2,3).pipe(
    map(x => x * 2)
  ).subscribe(console.log);

  //filter output  2, 4
  console.log("filter");
  of(1,2,3,4).pipe(
    filter(x => x%2 === 0)
  ).subscribe(console.log);


  //switchMap

of('joke').pipe(
  switchMap(() =>
    ajax.getJSON('https://v2.jokeapi.dev/joke/Any?type=single')
  )
).subscribe({
  next: data => console.log('Joke:', data),
  error: err => console.error('Error fetching joke:', err)
});

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <button
        ref={buttonRef}
        style={{
          padding: "15px 25px",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        Click Me
      </button>

      <h3>
        X: {clickPos.x} | Y: {clickPos.y}
      </h3>

      
    </div>
  );
}
