import amqplib from "amqplib";
import puppeteer from "puppeteer";

async function launch() {
  const queue = "URLs";
  amqplib.connect(
    process.env.RABBITMQ_ADDRESS as string,
    (err: any, conn: any) => {
      if (err) throw err;

      conn.createChannel(async (err: any, ch2: any) => {
        if (err) throw err;

        ch2.assertQueue(queue);

        ch2.consume(queue, async (msg: any) => {
          if (msg !== null) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(msg.content.toString());

            const cookies = await page.cookies();
            console.log(cookies);
            
            const size = await page.viewport();
            console.log(size);
          } else {
            console.log("Consumer cancelled by server");
          }
        });
      });
    }
  );
}

launch();
