import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthModule } from './auth.module';

describe('AuthModule', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule,
                JwtModule.register({
                    secret: 'secretKey',
                    signOptions: { expiresIn: '1h' },
                }),
            ],
            providers: [AuthService, JwtStrategy],
            controllers: [AuthController],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should validate a user', async () => {
        const result = { userId: 1, username: 'test' };
        jest.spyOn(authService, 'validateUser').mockImplementation(async () => result);

        expect(await authService.validateUser('test', 'password')).toBe(result);
    });

    it('should login a user', async () => {
        const result = { access_token: 'token' };
        jest.spyOn(authService, 'login').mockImplementation(async () => result);

        expect(await authService.login({ username: 'test', password: 'password' })).toBe(result);
    });
});