const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');

day1.addEventListener('click', handleDay1);
day2.addEventListener('click', handleDay2);

function handleDay1() {
    const scheduleContainer = document.querySelector('.schedule-cards-container')
    scheduleContainer.innerHTML = ''
    scheduleContainer.innerHTML = generateDay1()

}

function handleDay2() {
    const scheduleContainer = document.querySelector('.schedule-cards-container')
    scheduleContainer.innerHTML = ''
    scheduleContainer.innerHTML = generateDay2()
}

function generateDay1() {
    console.log('day1....')
    return `
    <article class="schedule-card">
    <img src="../images/profile.png" alt="">
    <section class="card">
        <div class="card-info">
            <div class="card-info-header">
                <h3>Fulldive technology using neurology and computer vision</h3>
                <h3>10:00 AM</h3>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ipsa ipsam corporis molestias vel odit quaerat corrupti fuga tempora, dolores libero delectus minima consequuntur enim incidunt repudiandae accusantium blanditiis aliquid natus labore totam, error impedit. Optio reprehenderit, laudantium suscipit officiis obcaecati rerum facilis eos fugit labore? Placeat aliquam repellendus illo eveniet, nam eius distinctio officia ullam dolor tempora. Explicabo ratione, possimus ducimus consequuntur, quo provident minima quaerat fugit ex alias ipsum sint iure! Illum ut labore nisi amet quod consectetur fugiat, expedita velit nemo est earum.</p>
        </div>
    </section>
</article>
    `
}

function generateDay2() {
    console.log('day2....')
    return `
    <article class="schedule-card">
    <img src="../images/profile.png" alt="">
    <section class="card">
        <div class="card-info">
            <div class="card-info-header">
                <h3>Limbs replacement using nanotechnology</h3>
                <h3>11:00 AM</h3>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ipsa ipsam corporis molestias vel odit quaerat corrupti fuga tempora, dolores libero delectus minima consequuntur enim incidunt repudiandae accusantium blanditiis aliquid natus labore totam, error impedit. Optio reprehenderit, laudantium suscipit officiis obcaecati rerum facilis eos fugit labore? Placeat aliquam repellendus illo eveniet, nam eius distinctio officia ullam dolor tempora. Explicabo ratione, possimus ducimus consequuntur, quo provident minima quaerat fugit ex alias ipsum sint iure! Illum ut labore nisi amet quod consectetur fugiat, expedita velit nemo est earum.</p>
        </div>
    </section>
</article>
    `
}

//Default show the day 1 contents.
handleDay1()

const acc = document.getElementsByClassName("accordion-btn");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}