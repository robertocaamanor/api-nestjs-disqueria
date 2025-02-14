import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn(),
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('login', () => {
        it('should return a token if credentials are valid', async () => {
            const loginDto: LoginDto = { username: 'test', password: 'test' };
            const result = { access_token: 'token' };

            jest.spyOn(authService, 'validateUser').mockResolvedValue(true);
            jest.spyOn(authService, 'login').mockResolvedValue(result);

            expect(await authController.login(loginDto)).toBe(result);
        });

        it('should throw UnauthorizedException if credentials are invalid', async () => {
            const loginDto: LoginDto = { username: 'test', password: 'test' };

            jest.spyOn(authService, 'validateUser').mockResolvedValue(false);

            await expect(authController.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should call validateUser with correct parameters', async () => {
            const loginDto: LoginDto = { username: 'test', password: 'test' };

            const validateUserSpy = jest.spyOn(authService, 'validateUser').mockResolvedValue(true);

            await authController.login(loginDto);

            expect(validateUserSpy).toHaveBeenCalledWith(loginDto.username, loginDto.password);
        });

        it('should call login with correct user', async () => {
            const loginDto: LoginDto = { username: 'test', password: 'test' };
            const user = { id: 1, username: 'test' };
            const result = { access_token: 'token' };

            jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
            const loginSpy = jest.spyOn(authService, 'login').mockResolvedValue(result);

            await authController.login(loginDto);

            expect(loginSpy).toHaveBeenCalledWith(user);
        });
    });
});