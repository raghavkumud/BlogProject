import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AuthDto } from "../src/auth/dto";
import { CreateBlogDto, EditBlogDto } from "../src/blog/dto";
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true,
      }
    ));
    await app.init();
    await app.listen(3434, () => {
      console.log(`app is running successfully`);
    });
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3434/')
  })
  afterAll(() => {
    app.close();
  })
  describe('Auth', () => {
    const dto: AuthDto = {
      email: "kumud54@gmail.com",
      password: "kumud",
      username: "kumud"
    }
    describe('Signup', () => {
      it('Should throw an exception if email is empty', () => {
        return pactum.spec().post('auth/signup').withBody({
          password: dto.password,
        }).expectStatus(400).inspect();
      });
      it('Should throw an exception if password is empty', () => {
        return pactum.spec().post('auth/signup').withBody({
          email: dto.email,
        }).expectStatus(400).inspect();
      });
      it('Should throw if no body', () => {
        return pactum.spec().post('auth/signup').withBody({
        }).expectStatus(400).inspect();
      });
      it('Should signup', () => {
        return pactum.spec().post('auth/signup').withBody(dto).expectStatus(201).inspect();
      });
    })
    describe('Signin', () => {
      it('Should throw an exception if email is empty', () => {
        return pactum.spec().post('auth/signin').withBody({
          password: dto.password,
        }).expectStatus(400).inspect();
      });
      it('Should throw an exception if password is empty', () => {
        return pactum.spec().post('auth/signin').withBody({
          email: dto.email,
        }).expectStatus(400).inspect();
      });
      it('Should throw if no body', () => {
        return pactum.spec().post('auth/signin').withBody({
        }).expectStatus(400).inspect();
      });
      it('Should signin', () => {
        return pactum.spec().post('auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    })
  })
  describe('User', () => {

    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('users/me').withHeaders(
          {
            Authorization: 'Bearer $S{userAt}'
          }
        ).expectStatus(200).inspect();
      })
    })
    describe('Edit user', () => { })
  })
  describe('Blog', () => {
    describe('Create blog', () => {

      it('create blog', () => {
        const dto: CreateBlogDto = {
          title: "First Blog",
          content: "It is the first blog created in the blog project.",
        }
        return pactum.spec().post('blogs').withHeaders(
          {
            Authorization: 'Bearer $S{userAt}'
          }
        ).withBody(dto).expectStatus(201).inspect().stores('blogId', 'id');
      })
    })
    describe('Get blogs', () => {
      it('it should get empty blogs', () => {
        return pactum.spec().get('blogs').withHeaders(
          {
            Authorization: 'Bearer $S{userAt}'
          }
        ).expectStatus(200).inspect();
      })
    })
    describe('Get blog by id', () => {

      it('get blog by id', () => {
        return pactum.spec().get('blogs/{id}').
          withPathParams('id', '$S{blogId}').
          withHeaders(
            {
              Authorization: 'Bearer $S{userAt}'
            }
          ).expectStatus(200).inspect();
      })
    })
    describe('Edit blog', () => {

      it('edit blog by id', () => {
        const dto: EditBlogDto = {
          content: "This is the updated content of the first blog"
        }
        return pactum.spec().patch('blogs/{id}').
          withPathParams('id', '$S{blogId}').
          withHeaders(
            {
              Authorization: 'Bearer $S{userAt}'
            }
          ).withBody(dto).expectStatus(200).inspect();
      })
    })
    describe('Delete blog', () => {

      it('delete blog by id', () => {
        return pactum.spec().delete('blogs/{id}').
          withPathParams('id', '$S{blogId}').
          withHeaders(
            {
              Authorization: 'Bearer $S{userAt}'
            }
          ).expectStatus(204).inspect();
      })
    })
  })
})
