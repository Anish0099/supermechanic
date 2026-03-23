import { AdminCreate, AdminUpdate } from './admin.schemas';

type AdminRecord = {
    id: string;
    username: string;
    email: string;
    password: string;
};

export class AdminService {
    private admins: AdminRecord[] = [];

    createAdmin(data: AdminCreate): AdminRecord {
        const newAdmin: AdminRecord = {
            id: String(this.admins.length + 1),
            username: data.username,
            email: data.email,
            password: data.password,
        };
        this.admins.push(newAdmin);
        return newAdmin;
    }

    getAdmins(): AdminRecord[] {
        return this.admins;
    }

    updateAdmin(id: string, data: AdminUpdate): AdminRecord | null {
        const index = this.admins.findIndex((admin) => admin.id === id);
        if (index === -1) {
            return null;
        }
        this.admins[index] = {
            ...this.admins[index],
            ...data,
        };
        return this.admins[index];
    }

    deleteAdmin(id: string): boolean {
        const index = this.admins.findIndex((admin) => admin.id === id);
        if (index === -1) {
            return false;
        }
        this.admins.splice(index, 1);
        return true;
    }
}
