package alex.iamandi.SonarMonitoringTool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
@EnableScheduling
@SpringBootApplication
public class SonarMonitoringTool{

	public static void main(String[] args) {
		SpringApplication.run(SonarMonitoringTool.class, args);
	}
}
