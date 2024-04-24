import { fakerFR as faker } from '@faker-js/faker';
import { PrismaClient, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUsers = async (number: number) => {
    const users = [];
    while (number) {
        const userVolunteer = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                role: RoleEnum.Volunteer,
                refreshToken: faker.string.alpha(155),
                password: await bcrypt.hash("devPunk!", 10)
            }
        })
        users.push(userVolunteer)
        number--
    }
    await prisma.user.create({
        data: {
            email: "admin@mail.com",
            role: RoleEnum.SuperAdmin,
            refreshToken: faker.string.alpha(155),
            password: await bcrypt.hash("devPunk!", 10)
        }
    })
    return users;
}

const createUserProfil = async (users: any[]) => {

    const usersProfil = [];

    let number = (users.length - 1);
    while (number) {
        const userProfilVolunteer = await prisma.profile.create({
            data: {
                userId: users[number].id,
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                nickname: faker.internet.userName()

            }
        })
        usersProfil.push(userProfilVolunteer)
        number--
    }
    return usersProfil;

}

function dateAddDays(a: number, b?: string | Date) {
    var d = new Date(b || new Date());
    d.setDate(d.getDate() + a);
    return d;
}


const createEvents = async (number: number) => {
    const events = [];
    while (number) {
        const startDate = faker.date.future()
        const endDate = dateAddDays(1, startDate)
        const event = await prisma.event.create({
            data: {
                title: faker.word.words(2).substring(0, 30),
                description: faker.lorem.lines(5),
                adress: faker.location.streetAddress(),
                startDate: startDate,
                endDate: endDate
            }
        })
        events.push(event)
        number--
    }
    return events;
}




// const createTask = () => { }
// const createTaskEvent = () => { }
// const createUserTaskEvent = () => { }
// const createUserBadge = () => { }
// const createNotification = () => { }
// const createUsernotification = () => { }




async function bootstrap() {
    const users = await createUsers(10);
    await createUserProfil(users);
    const events = await createEvents(10);


}

bootstrap();