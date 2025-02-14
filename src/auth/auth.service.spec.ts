import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mockedJwtToken'),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user data if username and password are correct', async () => {
            const result = await service.validateUser('admin', 'admin123');
            expect(result).toEqual({ username: 'admin' });
        });

        it('should return null if username and password are incorrect', async () => {
            const result = await service.validateUser('user', 'wrongpassword');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return an access token', async () => {
            const user = { username: 'admin' };
            const result = await service.login(user);
            expect(result).toEqual({ access_token: 'mockedJwtToken' });
            expect(jwtService.sign).toHaveBeenCalledWith({ username: 'admin' });
        });
    });
});